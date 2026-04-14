def main(args, ctx=None):
    name = args.get("name")
    email = args.get("email")
    phone = args.get("phone")
    
    with ctx.POSTGRESQL.cursor() as cur:
        cur.execute(
            "INSERT INTO contacts (name, email, phone) VALUES (%s, %s, %s) RETURNING id, name, email, phone",
            (name, email, phone)
        )
        ctx.POSTGRESQL.commit()
        row = cur.fetchone()
    
    return {
        "contact": {"id": row[0], "name": row[1], "email": row[2], "phone": row[3]}
    }
