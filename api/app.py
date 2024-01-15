from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/db_name'
db = SQLAlchemy(app)

class TabData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255))
    screenshot = db.Column(db.LargeBinary)

@app.route('/save_tab_data', methods=['POST'])
def save_tab_data():
    data = request.json
    url = data.get('url')
    screenshot = data.get('screenshot')

    tab_data = TabData(url=url, screenshot=screenshot)
    db.session.add(tab_data)
    db.session.commit()

    return 'Data saved successfully'

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)