#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KidBookFlow Producer API
智能绘本生产平台后端API服务
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
import json
import uuid
from typing import Dict, List, Optional

# 创建Flask应用
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///kidbookflow.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# 初始化扩展
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# 数据库模型
class User(db.Model):
    """用户模型"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    membership_type = db.Column(db.String(20), default='basic')  # basic, professional
    monthly_quota = db.Column(db.Integer, default=10)
    used_quota = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    # 关系
    templates = db.relationship('Template', backref='creator', lazy=True)
    tasks = db.relationship('ProductionTask', backref='user', lazy=True)
    materials = db.relationship('Material', backref='owner', lazy=True)

class Template(db.Model):
    """模板模型"""
    __tablename__ = 'templates'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    level = db.Column(db.String(20), nullable=False)  # pre-a1, a1, a2
    age_range = db.Column(db.String(20), nullable=False)  # 3-6, 7-9, 10-12
    theme = db.Column(db.String(50), nullable=False)  # cognitive, habit, story
    style = db.Column(db.String(50), nullable=False)  # soft, simple
    pages = db.Column(db.Integer, default=10)
    words_per_page = db.Column(db.String(20), default='5-8词')
    core_sentence = db.Column(db.String(200))
    education_goals = db.Column(db.Text)  # JSON格式
    ar_points = db.Column(db.Integer, default=3)
    cover_image = db.Column(db.String(500))
    is_public = db.Column(db.Boolean, default=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 外键
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # 关系
    tasks = db.relationship('ProductionTask', backref='template', lazy=True)

class ProductionTask(db.Model):
    """生产任务模型"""
    __tablename__ = 'production_tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(200), nullable=False)
    config = db.Column(db.Text)  # JSON格式存储配置
    status = db.Column(db.String(20), default='pending')  # pending, processing, completed, failed
    progress = db.Column(db.Integer, default=0)
    total_books = db.Column(db.Integer, default=1)
    completed_books = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    started_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)
    error_message = db.Column(db.Text)
    
    # 外键
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey('templates.id'), nullable=True)
    
    # 关系
    books = db.relationship('Book', backref='task', lazy=True)

class Book(db.Model):
    """绘本模型"""
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text)  # JSON格式存储内容
    cover_image = db.Column(db.String(500))
    pages = db.Column(db.Text)  # JSON格式存储页面数据
    ar_config = db.Column(db.Text)  # JSON格式存储AR配置
    offline_package = db.Column(db.String(500))  # 离线包路径
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 外键
    task_id = db.Column(db.Integer, db.ForeignKey('production_tasks.id'), nullable=False)

class Material(db.Model):
    """素材模型"""
    __tablename__ = 'materials'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # image, audio, video
    file_path = db.Column(db.String(500), nullable=False)
    file_size = db.Column(db.Integer)
    mime_type = db.Column(db.String(100))
    is_approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 外键
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

class QualityReport(db.Model):
    """质量报告模型"""
    __tablename__ = 'quality_reports'
    
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    visual_score = db.Column(db.Float)
    content_score = db.Column(db.Float)
    interaction_score = db.Column(db.Float)
    overall_score = db.Column(db.Float)
    issues = db.Column(db.Text)  # JSON格式存储问题列表
    suggestions = db.Column(db.Text)  # JSON格式存储建议
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# API路由

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    """用户注册"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'error': '缺少必要字段'}), 400
    
    # 检查用户是否已存在
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': '用户名已存在'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': '邮箱已存在'}), 400
    
    # 创建新用户
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        membership_type=data.get('membership_type', 'basic'),
        monthly_quota=10 if data.get('membership_type', 'basic') == 'basic' else 50
    )
    
    db.session.add(user)
    db.session.commit()
    
    # 生成访问令牌
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': '注册成功',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'membership_type': user.membership_type,
            'monthly_quota': user.monthly_quota,
            'used_quota': user.used_quota
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    """用户登录"""
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'error': '缺少用户名或密码'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'error': '用户名或密码错误'}), 401
    
    if not user.is_active:
        return jsonify({'error': '账户已被禁用'}), 401
    
    # 更新最后登录时间
    user.last_login = datetime.utcnow()
    db.session.commit()
    
    # 生成访问令牌
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': '登录成功',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'membership_type': user.membership_type,
            'monthly_quota': user.monthly_quota,
            'used_quota': user.used_quota
        }
    })

@app.route('/api/templates', methods=['GET'])
def get_templates():
    """获取模板列表"""
    # 获取查询参数
    level = request.args.get('level')
    age = request.args.get('age')
    theme = request.args.get('theme')
    style = request.args.get('style')
    search = request.args.get('search')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))
    
    # 构建查询
    query = Template.query.filter_by(is_active=True, is_public=True)
    
    if level:
        query = query.filter_by(level=level)
    if age:
        query = query.filter_by(age_range=age)
    if theme:
        query = query.filter_by(theme=theme)
    if style:
        query = query.filter_by(style=style)
    if search:
        query = query.filter(
            db.or_(
                Template.name.contains(search),
                Template.description.contains(search)
            )
        )
    
    # 分页
    pagination = query.paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    templates = []
    for template in pagination.items:
        templates.append({
            'id': template.id,
            'name': template.name,
            'description': template.description,
            'level': template.level,
            'age_range': template.age_range,
            'theme': template.theme,
            'style': template.style,
            'pages': template.pages,
            'words_per_page': template.words_per_page,
            'core_sentence': template.core_sentence,
            'education_goals': json.loads(template.education_goals) if template.education_goals else [],
            'ar_points': template.ar_points,
            'cover_image': template.cover_image,
            'created_at': template.created_at.isoformat()
        })
    
    return jsonify({
        'templates': templates,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': pagination.total,
            'pages': pagination.pages,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev
        }
    })

@app.route('/api/templates/<int:template_id>', methods=['GET'])
def get_template(template_id):
    """获取单个模板详情"""
    template = Template.query.get_or_404(template_id)
    
    if not template.is_active or not template.is_public:
        return jsonify({'error': '模板不存在或不可用'}), 404
    
    return jsonify({
        'id': template.id,
        'name': template.name,
        'description': template.description,
        'level': template.level,
        'age_range': template.age_range,
        'theme': template.theme,
        'style': template.style,
        'pages': template.pages,
        'words_per_page': template.words_per_page,
        'core_sentence': template.core_sentence,
        'education_goals': json.loads(template.education_goals) if template.education_goals else [],
        'ar_points': template.ar_points,
        'cover_image': template.cover_image,
        'created_at': template.created_at.isoformat()
    })

@app.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    """创建生产任务"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data or not data.get('task_name') or not data.get('config'):
        return jsonify({'error': '缺少必要字段'}), 400
    
    # 检查用户配额
    user = User.query.get(user_id)
    if user.used_quota >= user.monthly_quota:
        return jsonify({'error': '本月生成额度已用完'}), 400
    
    # 创建任务
    task = ProductionTask(
        task_name=data['task_name'],
        config=json.dumps(data['config']),
        user_id=user_id,
        template_id=data.get('template_id'),
        total_books=data.get('total_books', 1)
    )
    
    db.session.add(task)
    db.session.commit()
    
    return jsonify({
        'message': '任务创建成功',
        'task': {
            'id': task.id,
            'task_name': task.task_name,
            'status': task.status,
            'progress': task.progress,
            'total_books': task.total_books,
            'created_at': task.created_at.isoformat()
        }
    }), 201

@app.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    """获取用户的任务列表"""
    user_id = get_jwt_identity()
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))
    
    pagination = ProductionTask.query.filter_by(user_id=user_id).order_by(
        ProductionTask.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)
    
    tasks = []
    for task in pagination.items:
        tasks.append({
            'id': task.id,
            'task_name': task.task_name,
            'status': task.status,
            'progress': task.progress,
            'total_books': task.total_books,
            'completed_books': task.completed_books,
            'created_at': task.created_at.isoformat(),
            'started_at': task.started_at.isoformat() if task.started_at else None,
            'completed_at': task.completed_at.isoformat() if task.completed_at else None
        })
    
    return jsonify({
        'tasks': tasks,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': pagination.total,
            'pages': pagination.pages,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev
        }
    })

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    """获取任务详情"""
    user_id = get_jwt_identity()
    task = ProductionTask.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    
    books = []
    for book in task.books:
        books.append({
            'id': book.id,
            'title': book.title,
            'cover_image': book.cover_image,
            'created_at': book.created_at.isoformat()
        })
    
    return jsonify({
        'id': task.id,
        'task_name': task.task_name,
        'config': json.loads(task.config) if task.config else {},
        'status': task.status,
        'progress': task.progress,
        'total_books': task.total_books,
        'completed_books': task.completed_books,
        'created_at': task.created_at.isoformat(),
        'started_at': task.started_at.isoformat() if task.started_at else None,
        'completed_at': task.completed_at.isoformat() if task.completed_at else None,
        'error_message': task.error_message,
        'books': books
    })

@app.route('/api/books/<int:book_id>', methods=['GET'])
@jwt_required()
def get_book(book_id):
    """获取绘本详情"""
    user_id = get_jwt_identity()
    book = Book.query.join(ProductionTask).filter(
        Book.id == book_id,
        ProductionTask.user_id == user_id
    ).first_or_404()
    
    return jsonify({
        'id': book.id,
        'title': book.title,
        'content': json.loads(book.content) if book.content else {},
        'cover_image': book.cover_image,
        'pages': json.loads(book.pages) if book.pages else [],
        'ar_config': json.loads(book.ar_config) if book.ar_config else {},
        'offline_package': book.offline_package,
        'created_at': book.created_at.isoformat(),
        'updated_at': book.updated_at.isoformat()
    })

@app.route('/api/materials', methods=['POST'])
@jwt_required()
def upload_material():
    """上传素材"""
    user_id = get_jwt_identity()
    
    if 'file' not in request.files:
        return jsonify({'error': '没有文件'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': '没有选择文件'}), 400
    
    # 保存文件
    filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join('uploads', filename)
    os.makedirs('uploads', exist_ok=True)
    file.save(file_path)
    
    # 创建素材记录
    material = Material(
        name=file.filename,
        type=file.content_type.split('/')[0],
        file_path=file_path,
        file_size=os.path.getsize(file_path),
        mime_type=file.content_type,
        owner_id=user_id
    )
    
    db.session.add(material)
    db.session.commit()
    
    return jsonify({
        'message': '素材上传成功',
        'material': {
            'id': material.id,
            'name': material.name,
            'type': material.type,
            'file_size': material.file_size,
            'mime_type': material.mime_type,
            'is_approved': material.is_approved,
            'created_at': material.created_at.isoformat()
        }
    }), 201

@app.route('/api/materials', methods=['GET'])
@jwt_required()
def get_materials():
    """获取用户的素材列表"""
    user_id = get_jwt_identity()
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 20))
    
    pagination = Material.query.filter_by(owner_id=user_id).order_by(
        Material.created_at.desc()
    ).paginate(page=page, per_page=per_page, error_out=False)
    
    materials = []
    for material in pagination.items:
        materials.append({
            'id': material.id,
            'name': material.name,
            'type': material.type,
            'file_size': material.file_size,
            'mime_type': material.mime_type,
            'is_approved': material.is_approved,
            'created_at': material.created_at.isoformat()
        })
    
    return jsonify({
        'materials': materials,
        'pagination': {
            'page': page,
            'per_page': per_page,
            'total': pagination.total,
            'pages': pagination.pages,
            'has_next': pagination.has_next,
            'has_prev': pagination.has_prev
        }
    })

@app.route('/api/admin/stats', methods=['GET'])
@jwt_required()
def get_admin_stats():
    """获取管理员统计数据"""
    # 这里应该检查用户是否为管理员
    # 简化处理，实际应用中需要添加权限检查
    
    total_users = User.query.count()
    active_users = User.query.filter(User.last_login >= datetime.utcnow() - timedelta(days=30)).count()
    
    # 本月生成的绘本数量
    this_month = datetime.utcnow().replace(day=1)
    total_books = Book.query.join(ProductionTask).filter(
        Book.created_at >= this_month
    ).count()
    
    # 待审核素材
    pending_materials = Material.query.filter_by(is_approved=False).count()
    
    return jsonify({
        'total_users': total_users,
        'active_users': active_users,
        'total_books_this_month': total_books,
        'pending_materials': pending_materials
    })

# 错误处理
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': '资源不存在'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': '服务器内部错误'}), 500

# 创建数据库表
@app.before_first_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
