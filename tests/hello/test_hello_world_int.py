import os, requests as req

def test_hello_world_int():
    url = f"{os.environ.get("OPSDEV_HOST", "")}/api/my/hello/world"
    res = req.get(url).json()
    assert res.get("output") == "Ciao, world"
