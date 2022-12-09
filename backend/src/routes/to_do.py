from flask import Blueprint, request

from ..logic.convert_query_string_filter_by_to_dict import ConvertQueryStringFilterByToDict
from ..models.models import ToDo
from ..logic.to_do.order_by_to_dos import OrderByToDos
from ..utils.sql.database_crud import DatabaseCrud
from ..logic.to_dos import PostToDo, UpdateToDo
from ..models.marshmallow.schemas.ma_schemas import ToDoSchema
from ..decorators.verify_firebase_token_path_parameter import verify_firebase_token_path_parameter
from ..decorators.verify_firebase_token_request_body import verify_firebase_token_request_body


to_do = Blueprint("to_do", __name__)

@to_do.post("/to-dos/new")
@verify_firebase_token_request_body
def post_new_to_do():
    data = request.json
    PostToDo().add(user_firebase_uid=data["firebaseUid"], task=data["task"])
    return {"message": "To-Do created"}, 201

@to_do.get("/to-dos/<string:user_firebase_uid>")
@verify_firebase_token_path_parameter
def get_to_dos(user_firebase_uid):
    filters = ConvertQueryStringFilterByToDict(default_filters={"user_firebase_uid": user_firebase_uid}).add_query_string_filters(request.args.get("filterBy", {})) 
    query = OrderByToDos().order_query(order_by=request.args.get("orderBy", None), query=ToDo.query.filter_by(**filters))
    result = DatabaseCrud().fetch_all(query=query)
    return {"toDos": ToDoSchema(exclude=["user"]).dump(result, many=True)}, 200

@to_do.put("/to-dos/update")
@verify_firebase_token_request_body
def update():
    data = request.json
    UpdateToDo().update(to_do_id=data["toDoId"], update_attributes=data.get("updateAttributes", {}))
    return {"message": "To-Do updated"}, 200
