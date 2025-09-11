from flask import Flask, request, render_template_string
import joblib
import pandas as pd
import os
import sys

# --- App Initialization ---
app = Flask(__name__)

# --- Global Variables ---
model = None
model_columns = None
commodities, states, markets = [], [], []
startup_error = None

# --- YOUR CALCULATED VALUES ---
DEFAULT_VALUES = {
    'Last Week': 3195.014857,
    'Last Month': 2855.132829,
    'Last Year': 2600.097847
}

def extract_unique_items(columns):
    temp_commodities, temp_states, temp_markets = set(), set(), set()
    for col in columns:
        if col.startswith('Commodity_'):
            temp_commodities.add(col.split('Commodity_', 1)[1])
        elif col.startswith('State_'):
            temp_states.add(col.split('State_', 1)[1])
        elif col.startswith('Market_'):
            temp_markets.add(col.split('Market_', 1)[1])
    return sorted(list(temp_commodities)), sorted(list(temp_states)), sorted(list(temp_markets))

def load_model_and_columns():
    global model, model_columns, commodities, states, markets, startup_error
    try:
        basedir = os.path.abspath(os.path.dirname(__file__))
        model_path = os.path.join(basedir, 'xgb_price_predictor_g.pkl')
        if not os.path.exists(model_path):
            startup_error = f"Error: Model file '{os.path.basename(model_path)}' not found."
            return
        model = joblib.load(model_path)
        if hasattr(model, 'feature_names_in_'):
            model_columns = list(model.feature_names_in_)
            commodities, states, markets = extract_unique_items(model_columns)
        else:
            startup_error = "Error: Could not determine feature names from the loaded model."
    except Exception as e:
        startup_error = f"An unexpected error occurred during model loading: {e}"

HTML_TEMPLATE = """
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Commodity Price Predictor</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;background-color:#f4f4f9;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;padding:20px;box-sizing:border-box}.container{background:#fff;padding:30px 40px;border-radius:12px;box-shadow:0 4px 25px rgba(0,0,0,.1);width:100%;max-width:500px}h1{color:#2c5e2e;text-align:center;margin-bottom:25px}form{display:flex;flex-direction:column;gap:20px}label{font-weight:600;color:#333}select{padding:12px;border-radius:8px;border:1px solid #ccc;font-size:1rem;background-color:#fff;-webkit-appearance:none;appearance:none;background-image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5z%22%20fill%3D%22%23555%22/%3E%3C/svg%3E');background-repeat:no-repeat;background-position:right 12px center}button{background-color:#4caf50;color:#fff;padding:15px;border:none;border-radius:8px;cursor:pointer;font-size:1.1rem;font-weight:600;transition:background-color .2s}button:hover{background-color:#45a049}.result{margin-top:25px;padding:20px;border-radius:8px;text-align:center;font-size:1.2rem}.success{background-color:#e8f5e9;color:#2e7d32}.error{background-color:#ffebee;color:#c62828}
</style></head><body><div class="container"><h1>🌾 Commodity Price Predictor</h1>
{% if startup_error %}<div class="result error">{{ startup_error }}</div>
{% else %}<form method="post"><label for="commodity">Select Commodity:</label><select name="commodity" required>{% for item in commodities %}<option value="{{ item }}">{{ item }}</option>{% endfor %}</select><label for="state">Select State:</label><select name="state" required>{% for item in states %}<option value="{{ item }}">{{ item }}</option>{% endfor %}</select><label for="market">Select Market:</label><select name="market" required>{% for item in markets %}<option value="{{ item }}">{{ item }}</option>{% endfor %}</select><button type="submit">Predict Price</button></form>{% endif %}
{% if result %}<div class="result success"><h2>Predicted Price: ₹ {{ "%.2f"|format(result) }}</h2></div>{% endif %}
{% if error %}<div class="result error"><p>{{ error }}</p></div>{% endif %}
</div></body></html>
"""

@app.route('/', methods=['GET', 'POST'])
def index():
    if startup_error or model is None:
        return render_template_string(HTML_TEMPLATE, startup_error=(startup_error or "Model not loaded."))

    result, error = None, None
    if request.method == 'POST':
        try:
            data = request.form
            query_df = pd.DataFrame(columns=model_columns)
            query_df.loc[0, :] = 0.0

            for col, value in DEFAULT_VALUES.items():
                if col in query_df.columns:
                    query_df.loc[0, col] = value

            commodity_col = f"Commodity_{data['commodity']}"
            state_col = f"State_{data['state']}"
            market_col = f"Market_{data['market']}"
            
            for col in [commodity_col, state_col, market_col]:
                if col not in model_columns:
                    raise KeyError(f"Invalid feature: {e}")

            query_df.loc[0, commodity_col] = 1.0
            query_df.loc[0, state_col] = 1.0
            query_df.loc[0, market_col] = 1.0
            
            query_df = query_df[model_columns]

            # ========================= DIAGNOSTIC STEP 1 =========================
            print("\n--- DEBUG: DATA TYPES BEFORE CONVERSION ---", file=sys.stderr)
            print(query_df.dtypes, file=sys.stderr)
            # =====================================================================

            # This line FORCES all columns to be float, which is what the model needs.
            query_df = query_df.astype(float)
            
            # ========================= DIAGNOSTIC STEP 2 =========================
            print("\n--- DEBUG: DATA TYPES AFTER CONVERSION ---", file=sys.stderr)
            print(query_df.dtypes, file=sys.stderr)
            print("\nAttempting to predict...", file=sys.stderr)
            # =====================================================================

            prediction = model.predict(query_df)
            result = float(prediction[0])
            print("Prediction successful!", file=sys.stderr)

        except Exception as e:
            error = f"An unexpected error occurred: {e}"
            # This will print the error to your terminal for debugging
            print(f"❌ PREDICTION FAILED. ERROR: {e}", file=sys.stderr)

    return render_template_string(HTML_TEMPLATE, startup_error=None, result=result, error=error, 
                                  commodities=commodities, states=states, markets=markets)

if __name__ == '__main__':
    print("--- Starting Flask App: Loading model... ---")
    load_model_and_columns()
    print("--- Model loading complete. Starting server on http://127.0.0.1:5000 ---")
    app.run(debug=True, port=5000)