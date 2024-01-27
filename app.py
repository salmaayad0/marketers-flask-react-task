from flask import Flask, request
from flask_migrate import Migrate
from flask_login import LoginManager, login_required
from flask_cors import CORS, cross_origin

from .models import db, User
from .controllers import signUp_user, get_all_users, login, logout, create_project, get_all_projects

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secrt_key_value'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///marketers.db'


cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

db.init_app(app)
migrate = Migrate(app, db)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/signup', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup_view():
    return signUp_user(request)


@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_view():
    return login(request)


@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def get_all_users_view():
    return get_all_users()



@app.route('/logout', methods=['POST'])
@cross_origin(supports_credentials=True)
@login_required
def logout_view():
    return logout()


@app.route('/create', methods=['POST'])
@cross_origin(supports_credentials=True)
@login_required
def create_project_view():
    return create_project(request)


@app.route('/projects', methods=['GET'])
@cross_origin(supports_credentials=True)
def get_all_projects_view():
    return get_all_projects()


if __name__ == '__main__':
    app.run(debug=True)