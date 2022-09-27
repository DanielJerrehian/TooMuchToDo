import unittest
from dotenv import load_dotenv
from io import BytesIO
import os

from ...client import ApiClient
from src.utils.azure.blob_storage import BlobStorage, DeleteBlob, UploadBlob

class TestInsertUpdate(unittest.TestCase):
    def setUp(self):
        load_dotenv(".env")
        self.storage_container_name = "pictures/profilePictures"
        self.blob_name = "test"

    def tearDown(self):
        pass

    def test_class_exists(self):
        self.assertTrue(BlobStorage)

    def test_attributes(self):
        blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        self.assertTrue(blob.storage_url)
        self.assertTrue(blob.storage_key)
        self.assertTrue(blob.connection_string)

    def test_get_blob_client(self):
        blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        blob.get_blob_client()
        self.assertTrue(blob.blob_client)

    def test_get_blob_service_client(self):
        blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        blob.get_blob_client()
        blob.get_blob_service_client()
        self.assertTrue(blob.blob_service_client)

    def test_get_storage_container_client(self):
        blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        blob.get_blob_client()
        blob.get_blob_service_client()
        blob.get_storage_container_client()
        self.assertTrue(blob.storage_container)

    def test_close_connection(self):
        blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        blob.get_blob_client()
        blob.get_blob_service_client()
        blob.get_storage_container_client()
        blob.close_connection()
        self.assertTrue(blob)


class TestDeleteBlob(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.storage_container_name = "pictures/profilePictures"
        self.blob_name = "Chlopig"
        with open(os.path.join(self.api.app.root_path, "static", "Chlopig.jpg"), "rb") as image:
            image = BytesIO(image.read())
            self.upload_data = image
        upload = UploadBlob(storage_container_name=self.storage_container_name, upload_data=self.upload_data, blob_name=self.blob_name)
        upload.get_blob_client()
        upload.get_blob_service_client()
        upload.get_storage_container_client()
        upload.upload_data_to_container()
        upload.get_blob_file_link()

    def tearDown(self):
        delete = DeleteBlob(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        delete.get_blob_client()
        delete.get_blob_service_client()
        delete.get_storage_container_client()
        delete.check_if_blob_exists()
        if delete.blob_exists:
            delete.delete_blob()
        delete.close_connection()

    def test_class_exists(self):
        self.assertTrue(DeleteBlob)

    def test_check_if_blob_exists(self):
        delete = DeleteBlob(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        delete.get_blob_client()
        delete.get_blob_service_client()
        delete.get_storage_container_client()
        delete.check_if_blob_exists()
        self.assertTrue(delete.blob_exists)
        delete.close_connection()

    def test_delete_blob(self):
        delete = DeleteBlob(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        delete.get_blob_client()
        delete.get_blob_service_client()
        delete.get_storage_container_client()
        delete.check_if_blob_exists()
        delete.delete_blob()
        confirm_deleted = DeleteBlob(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        confirm_deleted.get_blob_client()
        confirm_deleted.get_blob_service_client()
        confirm_deleted.get_storage_container_client()
        confirm_deleted.check_if_blob_exists()
        self.assertEqual(confirm_deleted.blob_exists, False)
        confirm_deleted.close_connection()


class TestUploadBlob(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.storage_container_name = "pictures/profilePictures"
        self.blob_name = "Chlopig"
        with open(os.path.join(self.api.app.root_path, "static", "Chlopig.jpg"), "rb") as image:
            image = BytesIO(image.read())
            self.upload_data = image

    def tearDown(self):
        delete = DeleteBlob(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
        delete.get_blob_client()
        delete.get_blob_service_client()
        delete.get_storage_container_client()
        delete.check_if_blob_exists()
        if delete.blob_exists:
            delete.delete_blob()
        delete.close_connection()

    def test_class_exists(self):
        self.assertTrue(UploadBlob)

    def test_upload_data_to_container(self):
        upload = UploadBlob(storage_container_name=self.storage_container_name, upload_data=self.upload_data, blob_name=self.blob_name)
        upload.get_blob_client()
        upload.get_blob_service_client()
        upload.get_storage_container_client()
        upload.upload_data_to_container()
        self.assertTrue(upload.blob_client.exists())
        upload.close_connection()

    def test_get_blob_file_link(self):
        upload = UploadBlob(storage_container_name=self.storage_container_name, upload_data=self.upload_data, blob_name=self.blob_name)
        upload.get_blob_client()
        upload.get_blob_service_client()
        upload.get_storage_container_client()
        upload.upload_data_to_container()
        upload.get_blob_file_link()
        self.assertEqual(upload.blob_file_link, f"https://todoappblobstorage.blob.core.windows.net/pictures/profilePictures/{self.blob_name}")
        upload.close_connection()