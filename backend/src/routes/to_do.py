from flask import Blueprint, request

from ..logic.convert_query_string_filter_by_to_dict import ConvertQueryStringFilterByToDict
from ..logic.to_dos import GetToDos, PostToDo, UpdateToDo
from ..models.marshmallow.schemas.ma_schemas import ToDoSchema
from ..decorators.verify_firebase_id_token import verify_firebase_id_token


to_do = Blueprint("to_do", __name__)

@to_do.post("/to-dos/new")
@verify_firebase_id_token
def post_new_to_do():
    data = request.json
    if request.user["uid"] == data["firebaseUid"]:
        to_do = PostToDo(user_firebase_uid=data["firebaseUid"], task=data["task"])
        to_do.add_to_do()
        to_do.commit()
        return {"message": "To-Do created"}, 201

@to_do.get("/to-dos/<string:user_firebase_uid>")
@verify_firebase_id_token
def get_to_dos(user_firebase_uid):
    if request.user["uid"] == user_firebase_uid:
        convert = ConvertQueryStringFilterByToDict(
            default_filters={"user_firebase_uid": user_firebase_uid}, 
            query_string_filters=request.args.get("filterBy", None)
        )
        convert.add_default_filters()
        convert.add_query_string_filters() 
        to_dos = GetToDos(filters=convert.filters, order_by=request.args.get("orderBy", None))
        to_dos.order_query()
        to_dos.fetch_all()
        return {"toDos": ToDoSchema(exclude=["user"]).dump(to_dos.result, many=True)}, 200
    else:
        return {"message": "Forbidden"}, 403

@to_do.put("/to-dos/update")
@verify_firebase_id_token
def update_to_do():
    data = request.json
    if request.user["uid"] == data["firebaseUid"]:
        to_do = UpdateToDo(to_do_id=data["toDoId"], update_attributes=data["updateAttributes"])
        to_do.update_to_do()
        to_do.commit()
        return {"message": "To-Do updated"}, 200
    
    