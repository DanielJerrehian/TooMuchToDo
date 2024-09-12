from flask import Blueprint

from ..logic.site_statistics.site_statistics import SiteStatistics


public = Blueprint("public", __name__)


@public.get("/")
def index():
    return {"message": "Welcome to the Too Much To Do API"}


@public.get("/site-statistics")
def get_site_statistics():
    stats = SiteStatistics()
    total_users = stats.get_total_users()
    total_to_dos = stats.get_total_to_dos()
    total_completed_to_dos = stats.get_total_completed_to_dos()
    return {"stats": {"totalUsers": total_users, "totalToDos": total_to_dos, "totalCompletedToDos": total_completed_to_dos}}, 200
