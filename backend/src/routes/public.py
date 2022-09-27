from flask import Blueprint, request, make_response

from ..logic.site_statistics import SiteStatistics


public = Blueprint("public", __name__)
    
@public.get("/")
def index():
    return {"message": "Thanks for visiting the Too Much To Do API! Documentation coming soon..."}

@public.get("/site-statistics")
def get_site_statistics():
    stats = SiteStatistics()
    stats.get_total_users()
    stats.get_total_to_dos()
    stats.get_total_completed_to_dos()
    return {"stats": {
        "totalUsers": stats.total_users,
        "totalToDos": stats.total_to_dos,
        "totalCompletedToDos": stats.total_completed_to_dos
    }}, 200