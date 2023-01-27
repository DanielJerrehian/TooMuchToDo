import json


class ConvertQueryStringFilterByToDict:
    def __init__(self, default_filters: dict = None):
        if not default_filters:
            default_filters = {}
        self.filters = {}
        self.filters.update(default_filters)
        
    def add_query_string_filters(self, query_string_filters) -> dict:
        if query_string_filters:
            self.filters.update(json.loads(query_string_filters))
        return self.filters
        