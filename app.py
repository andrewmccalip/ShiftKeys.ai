from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Define the application version
APP_VERSION = "0.20"  # You can update this as needed

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/latest_version')
def latest_version():
    return jsonify({"latest_version": APP_VERSION})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False) 