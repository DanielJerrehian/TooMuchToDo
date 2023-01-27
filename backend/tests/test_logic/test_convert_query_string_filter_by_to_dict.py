import unittest
import json

from src.logic.convert_query_string_filter_by_to_dict import ConvertQueryStringFilterByToDict


class TestConvertQueryStringFilterByToDict(unittest.TestCase):
    def setUp(self):
        self.default_filters = {"user_firebase_uid": "123456789"}

    def tearDown(self):
        pass

    def test_class_object_exists(self):
        self.assertTrue(ConvertQueryStringFilterByToDict)

    def test_pass_args(self):
        class_object = ConvertQueryStringFilterByToDict(default_filters={"test": "filter"})
        self.assertEqual(class_object.filters, {"test": "filter"})

    def test_add_query_string_filters(self):
        class_object = ConvertQueryStringFilterByToDict(default_filters=self.default_filters)
        filters = class_object.add_query_string_filters(query_string_filters=json.dumps({"deleted": False}))
        self.assertEqual(filters, {"user_firebase_uid": "123456789", "deleted": False})