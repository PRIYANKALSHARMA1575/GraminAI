# GRAMINAI/backend/predictor_demo.py

from flask import Flask, request, render_template_string
import joblib
import pandas as pd
import os
import numpy as np

# --- App Initialization ---
app = Flask(__name__)

# --- Global Variables ---
model = None
model_columns = None
commodities = []
states = []
markets = []
startup_error = None

# --- Helper Function to Extract Unique Items from Columns ---
def extract_unique_items(columns):
    """Parses column names to create dropdown lists."""
    temp_commodities, temp_states, temp_markets = set(), set(), set()
    for col in columns:
        if col.startswith('Commodity_'):
            temp_commodities.add(col.split('Commodity_', 1)[1])
        elif col.startswith('State_'):
            temp_states.add(col.split('State_', 1)[1])
        elif col.startswith('Market_'):
            temp_markets.add(col.split('Market_', 1)[1])
    return sorted(list(temp_commodities)), sorted(list(temp_states)), sorted(list(temp_markets))

# --- Model Loading (Runs Once at Startup) ---
def load_model_and_columns():
    """Loads the model and feature names when the app starts."""
    global model, model_columns, commodities, states, markets, startup_error
    try:
        basedir = os.path.abspath(os.path.dirname(__file__))
        model_path = os.path.join(basedir, 'xgb_price_predictor_g.pkl') # Use your actual .pkl file name
        if not os.path.exists(model_path):
            startup_error = f"Error: Model file '{os.path.basename(model_path)}' not found."
            print(f"❌ {startup_error}")
            return
        
        model = joblib.load(model_path)
        print("✅ Price prediction model loaded.")
        
        if hasattr(model, 'feature_names_in_'):
            model_columns = list(model.feature_names_in_)
            print(f"✅ Detected {len(model_columns)} feature columns from the model.")
            commodities, states, markets = extract_unique_items(model_columns)
        else:
            startup_error = "Error: Could not determine feature names from the loaded model."
            print(f"❌ {startup_error}")
            
    except Exception as e:
        startup_error = f"An unexpected error occurred during model loading: {e}"
        print(f"❌ {startup_error}")

# --- HTML Template (Simplified) ---
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Commodity Price Predictor</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f4f4f9; display: flex; justify-content: center; padding: 50px 20px; }
    .container { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); width: 100%; max-width: 500px; text-align: center; }
    h1 { color: #2c5e2e; margin-top: 0; }
    form { display: flex; flex-direction: column; gap: 20px; }
    label { font-weight: 600; text-align: left; }
    select { padding: 12px; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem; width: 100%; }
    button { background-color: #4CAF50; color: white; padding: 15px; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: bold; }
    .result { margin-top: 30px; padding: 20px; border-radius: 8px; }
    .success { background-color: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
    .error { background-color: #ffebee; color: #c62828; border: 1px solid #ffcdd2; }
    .result h2 { margin: 0; font-size: 1.2rem; font-weight: 500;}
    .result .price { font-size: 1.8rem; font-weight: bold; margin-top: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🌾 Commodity Price Predictor</h1>
    {% if startup_error %}
      <div class="result error">{{ startup_error }}</div>
    {% else %}
      <form method="post">
        <label for="commodity">Select Commodity:</label>
        <select name="commodity" required>
          {% for item in commodities %} <option value="{{ item }}">{{ item }}</option> {% endfor %}
        </select>
        <label for="state">Select State:</label>
        <select name="state" required>
          {% for item in states %} <option value="{{ item }}">{{ item }}</option> {% endfor %}
        </select>
        <label for="market">Select Market:</label>
        <select name="market" required>
          {% for item in markets %} <option value="{{ item }}">{{ item }}</option> {% endfor %}
        </select>
        <button type="submit">Predict Price</button>
      </form>
    {% endif %}
    {% if result %}
      <div class="result success">
        <h2>Maximum price it can be sold per quintal =</h2>
        <p class="price">₹ {{ "%.2f"|format(result) }}</p>
      </div>
    {% endif %}
    {% if error %}
      <div class="result error"><p>{{ error }}</p></div>
    {% endif %}
  </div>
</body>
</html>
"""

@app.route('/', methods=['GET', 'POST'])
def index():
    if startup_error or model is None:
        return render_template_string(HTML_TEMPLATE, startup_error=(startup_error or "Model not loaded."))

    result, error = None, None
    if request.method == 'POST':
        try:
            data = request.form
            
            # Initialize a dictionary with all expected features, defaulting to 0
            query_data = {col: 0 for col in model_columns}

            # Handle Categorical Inputs
            commodity_col = f"Commodity_{data['commodity']}"
            state_col = f"State_{data['state']}"
            market_col = f"Market_{data['market']}"
            
            for col in [commodity_col, state_col, market_col]:
                if col not in query_data:
                    raise KeyError(f"The input value '{col.split('_', 1)[1]}' does not match any feature the model was trained on.")
                query_data[col] = 1
            
            # Create DataFrame
            query_df = pd.DataFrame([query_data])
            
            # Reorder columns to match the model's training order
            query_df = query_df[model_columns]

            # Ensure all columns are numeric (float32) before predicting
            query_df = query_df.astype(np.float32)

            # Make the prediction
            prediction = model.predict(query_df)
            result = float(prediction[0])

        except KeyError as e:
            error = f"Input Mismatch Error: {e}"
        except Exception as e:
            print(f"An unexpected error occurred: {e}") 
            error = f"An unexpected error occurred during prediction."

    return render_template_string(HTML_TEMPLATE, startup_error=None, result=result, error=error, 
                                  commodities=commodities, states=states, markets=markets)

if __name__ == '__main__':
    print("--- Starting Flask App ---")
    load_model_and_columns()
    print("--- Starting Server ---")
    app.run(debug=True, port=5000)

