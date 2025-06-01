from flask import Flask, render_template, jsonify
import os

app = Flask(__name__)

# Define the application version
APP_VERSION = "0.21"  # You can update this as needed

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/new')
def new_home():
    return render_template('index.html')

@app.route('/latest_version')
def latest_version():
    return jsonify({"latest_version": APP_VERSION})


@app.route('/workflow')
def workflow():
    return render_template('workflow.html')

@app.route('/workflow2')
def workflow2():
    return render_template('workflow2.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=False) 