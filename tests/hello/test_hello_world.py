import hello.world.world as m

def test_hello_world():
    args = {}
    res = m.main(args)
    assert res["output"] == "Ciao, world"
