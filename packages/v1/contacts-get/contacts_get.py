def main(args, ctx=None):
    with ctx.POSTGRESQL.cursor() as cur:
        cur.execute("SELECT id, name, email, phone FROM contacts")
        rows = cur.fetchall()
    return {
        "contacts": [
            {"id": row[0], "name": row[1], "email": row[2], "phone": row[3]}
            for row in rows
        ]
    }
