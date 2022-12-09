import unittest
from dotenv import load_dotenv
from io import BytesIO
import os

from ...client import ApiClient
from src.utils.azure.blob_storage import BlobStorage, DeleteBlob, UploadBlob

# class TestInsertUpdate(unittest.TestCase):
#     def setUp(self):
#         load_dotenv(".env")
#         self.storage_container_name = "pictures/profilePictures"
#         self.blob_name = "test"

#     def tearDown(self):
#         pass

#     def test_class_exists(self):
#         self.assertTrue(BlobStorage)

#     def test_attributes(self):
#         blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
#         self.assertTrue(blob.storage_url)
#         self.assertTrue(blob.storage_key)
#         self.assertTrue(blob.connection_string)

#     def test_get_blob_client(self):
#         blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
#         blob.get_blob_client()
#         self.assertTrue(blob.blob_client)

#     def test_get_blob_service_client(self):
#         blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
#         blob.get_blob_client()
#         blob.get_blob_service_client()
#         self.assertTrue(blob.blob_service_client)

#     def test_get_storage_container_client(self):
#         blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
#         blob.get_blob_client()
#         blob.get_blob_service_client()
#         blob.get_storage_container_client()
#         self.assertTrue(blob.storage_container)

#     def test_close_connection(self):
#         blob = BlobStorage(storage_container_name=self.storage_container_name, blob_name=self.blob_name)
#         blob.get_blob_client()
#         blob.get_blob_service_client()
#         blob.get_storage_container_client()
#         blob.close_connection()
#         self.assertTrue(blob)


class TestDeleteBlob(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.storage_container_name = "pictures/profilePictures"
        self.blob_name = "Chlopig"
        with open(os.path.join(self.api.app.root_path, "static", "Chlopig.jpg"), "rb") as image:
            image = BytesIO(image.read())
            self.upload_data = image
        upload = UploadBlob()
        upload.upload_blob(blob_name=self.blob_name, data=self.upload_data)
        for client in [upload.blob_service_client, upload.storage_container_client]:
                upload.close_connection(client=client)

    def tearDown(self):
        delete = DeleteBlob(blob_name=self.blob_name)
        delete.delete_blob()
        for client in [delete.blob_client, delete.blob_service_client, delete.storage_container_client]:
                delete.close_connection(client=client)

    def test_class_exists(self):
        self.assertTrue(DeleteBlob)

    def test_delete_blob(self):
        delete = DeleteBlob(blob_name=self.blob_name)
        delete.delete_blob()
        for client in [delete.blob_client, delete.blob_service_client, delete.storage_container_client]:
                delete.close_connection(client=client)
        blob = BlobStorage(blob_name=self.blob_name)
        self.assertEqual(blob.blob_client.exists(), False)
        for client in [blob.blob_client, blob.blob_service_client, blob.storage_container_client]:
                blob.close_connection(client=client)


class TestUploadBlob(unittest.TestCase):
    def setUp(self):
        self.api = ApiClient()
        self.storage_container_name = "pictures/profilePictures"
        self.blob_name = "Chlopig"
        with open(os.path.join(self.api.app.root_path, "static", "Chlopig.jpg"), "rb") as image:
            image = BytesIO(image.read())
            self.upload_data = image

    def tearDown(self):
        delete = DeleteBlob(blob_name=self.blob_name)
        delete.delete_blob()
        for client in [delete.blob_client, delete.blob_service_client, delete.storage_container_client]:
                delete.close_connection(client=client)

    def test_class_exists(self):
        self.assertTrue(UploadBlob)

    def test_upload_blob(self):
        upload = UploadBlob()
        link = upload.upload_blob(blob_name=self.blob_name, data=self.upload_data)
        self.assertTrue(link)
        for client in [upload.blob_service_client, upload.storage_container_client]:
            upload.close_connection(client=client)
        blob = BlobStorage(blob_name=self.blob_name)
        self.assertEqual(blob.blob_client.exists(), True)
        for client in [blob.blob_client, blob.blob_service_client, blob.storage_container_client]:
                blob.close_connection(client=client)
        
