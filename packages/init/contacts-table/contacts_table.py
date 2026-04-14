def main(args, ctx=None):
    with ctx.POSTGRESQL.cursor() as cur:
        cur.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NOT NULL
            )
        """)
        ctx.POSTGRESQL.commit()
    return {"status": "success", "message": "Contacts table created"}
