def main(args, ctx=None):
    id = args.get("id")
    
    with ctx.POSTGRESQL.cursor() as cur:
        cur.execute("DELETE FROM contacts WHERE id = %s", (id,))
        ctx.POSTGRESQL.commit()
    
    return {"status": "success", "message": f"Contact {id} deleted"}
