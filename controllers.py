from flask import jsonify, make_response
from flask_login import login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


from .models import User, Project, db


def signUp_user(request):
    data = request.get_json()

    existing_user_email = User.query.filter_by(email=data['email']).first()

    if existing_user_email:
        return make_response(jsonify({'message': 'That email already exists... login.'}), 409)
    else:
        hashed_password = generate_password_hash(data['password'])
        new_user = User(email=data['email'], username=data['username'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify({'message': 'user created'}), 201)


def get_all_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['email'] = user.email
        user_data['username'] = user.username
        # user_data['password'] = user.password
        output.append(user_data)

    return make_response(jsonify({'users': output}), 200)


def login(request):
    data = request.get_json()
    existing_user_email = User.query.filter_by(email=data['email']).first()

    if existing_user_email:
        user = User.query.filter_by(email=data['email']).first()
        if user:
            if check_password_hash(user.password, data['password']):
                login_user(user)
                return make_response(jsonify({'message': 'user loggedin'}), 200)
            else:
                return make_response(jsonify({'message': 'wrong password'}), 401)
    return make_response(jsonify({'message': 'user not found, please sign up first'}), 404)


def logout():
    logout_user()
    return make_response(jsonify({'message': 'user loggedout'}), 205)


def create_project(request):
    if current_user.is_authenticated:
        data = request.get_json()
        new_project = Project(title=data['title'],
                              description=data['description'],
                              start=data['start'],
                              end=data['end'],
                              user_id=current_user.id)
        db.session.add(new_project)
        db.session.commit()
        return make_response(jsonify({'message': 'project created'}), 201)

    return make_response(jsonify({'message': 'erorr'}), 404)


def get_user_email(user_id):
    user = User.getUser(user_id)
    return user.email


def get_all_projects():
    projects = Project.query.all()
    output = []
    for project in projects:
        project_data = {}
        diff = (project.end - project.start)/project.end
        project_data['id'] = project.id
        project_data['title'] = project.title
        project_data['description'] = project.description
        project_data['user'] = get_user_email(project.user_id)
        project_data['difference'] = diff * 100

        output.append(project_data)

    return make_response(jsonify({'projects': output}))


