def main(args, ctx=None):
    id = args.get("id")
    name = args.get("name")
    email = args.get("email")
    phone = args.get("phone")
    
    with ctx.POSTGRESQL.cursor() as cur:
        cur.execute(
            "UPDATE contacts SET name = %s, email = %s, phone = %s WHERE id = %s RETURNING id, name, email, phone",
            (name, email, phone, id)
        )
        ctx.POSTGRESQL.commit()
        row = cur.fetchone()
    
    if row:
        return {
            "contact": {"id": row[0], "name": row[1], "email": row[2], "phone": row[3]}
        }
    return {"error": "Contact not found"}
