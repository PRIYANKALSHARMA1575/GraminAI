import os
import random
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

# --- App Initialization ---
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# --- Database Configuration ---
# This configures our app to use a database file named 'graminai.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'graminai.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# --- Database Models ---
# This defines the structure of our tables using Python classes.

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    mobile_number = db.Column(db.String(15), unique=True, nullable=False)
    role = db.Column(db.String(50), nullable=False, default='farmer') # farmer or government_employee
    full_name = db.Column(db.String(100))
    state = db.Column(db.String(100))
    district = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class OTP(db.Model):
    __tablename__ = 'otps'
    id = db.Column(db.Integer, primary_key=True)
    mobile_number = db.Column(db.String(15), nullable=False)
    otp_code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_verified = db.Column(db.Boolean, default=False)

# --- API Endpoints ---

@app.route('/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json()
    mobile_number = data.get('mobile_number')

    if not mobile_number or len(mobile_number) != 10:
        return jsonify({"error": "Valid 10-digit mobile number is required"}), 400

    otp_code = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    
    # Create or update OTP record
    otp_record = OTP.query.filter_by(mobile_number=mobile_number).first()
    if otp_record:
        otp_record.otp_code = otp_code
        otp_record.expires_at = expires_at
        otp_record.is_verified = False
    else:
        otp_record = OTP(mobile_number=mobile_number, otp_code=otp_code, expires_at=expires_at)
        db.session.add(otp_record)
    
    db.session.commit()
    
    print(f"--- OTP for {mobile_number} is {otp_code} ---")
    return jsonify({"message": "OTP has been sent successfully."}), 200


@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
    otp_code = data.get('otp_code')

    if not mobile_number or not otp_code:
        return jsonify({"error": "Mobile number and OTP are required"}), 400

    otp_record = OTP.query.filter_by(mobile_number=mobile_number, otp_code=otp_code).first()

    if not otp_record or otp_record.expires_at < datetime.utcnow() or otp_record.is_verified:
        return jsonify({"error": "Invalid or expired OTP."}), 401

    otp_record.is_verified = True
    
    # Check if user exists, if not, create one
    user = User.query.filter_by(mobile_number=mobile_number).first()
    if not user:
        user = User(mobile_number=mobile_number)
        db.session.add(user)

    db.session.commit()
    
    # In a real app, generate and return a JWT here
    return jsonify({
        "message": "Login successful!",
        "token": "dummy-auth-token-for-testing",
        "user": {"mobile_number": user.mobile_number, "role": user.role}
    }), 200

# --- Function to Create the Database ---
def create_database(app):
    with app.app_context():
        db.create_all()
    print("Database created!")

if __name__ == '__main__':
    # Create the database file if it doesn't exist
    if not os.path.exists('graminai.db'):
        create_database(app)
    app.run(debug=True)

