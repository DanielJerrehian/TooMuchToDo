import json


class ConvertQueryStringFilterByToDict:
    def __init__(self, default_filters: dict = {}, query_string_filters: dict = {}):
        self.default_filters = default_filters
        self.query_string_filters = query_string_filters
        self.filters = {}
    
    def add_default_filters(self):
        self.filters.update(self.default_filters)
        
    def add_query_string_filters(self):
        if self.query_string_filters:
            self.filters.update(json.loads(self.query_string_filters))