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
        class_object = ConvertQueryStringFilterByToDict(default_filters="test_1", query_string_filters="test_2")
        self.assertEqual(class_object.default_filters, "test_1")
        self.assertEqual(class_object.query_string_filters, "test_2")
        self.assertEqual(class_object.filters, {})
    
    def test_add_default_filters(self):
        class_object = ConvertQueryStringFilterByToDict(default_filters=self.default_filters, query_string_filters={"deleted": False})
        class_object.add_default_filters()
        self.assertEqual(class_object.filters, self.default_filters)

    def test_add_query_string_filters(self):
        class_object = ConvertQueryStringFilterByToDict(default_filters=self.default_filters, query_string_filters=json.dumps({"deleted": False}))
        class_object.add_query_string_filters()
        self.assertEqual(class_object.filters, {"deleted": False})

    def test_all_methods(self):
        class_object = ConvertQueryStringFilterByToDict(default_filters=self.default_filters, query_string_filters=json.dumps({"deleted": False}))
        class_object.add_default_filters()
        class_object.add_query_string_filters()
        self.assertEqual(class_object.filters, {"user_firebase_uid": "123456789", "deleted": False})