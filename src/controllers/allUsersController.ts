import { Request, Response } from "express"
import pool from "../config/db"
class allUsersController {
    //     static async getAllUsers(req: Request, res: Response) {
    //     const { page = 1, pageSize = 10 } = req.query;
    //     const pageNum = Number(page);
    //     const pageSizeNum = Number(pageSize);
    //     const offset = (pageNum - 1) * pageSizeNum;
    //     console.log(`Fetching page: ${pageNum}, PageSize: ${pageSizeNum}, Offset: ${offset}`);
    //     try {
    //         const [rows] = await pool.query(
    //             'SELECT * FROM users LIMIT ? OFFSET ?',
    //             [pageSizeNum, offset]
    //         );
    //         const [totalCountResult]: [any[], any] = await pool.query('SELECT COUNT(*) AS totalCount FROM users');
    //         const totalCount = totalCountResult[0].totalCount;
    //         console.log('Total Count:', totalCount);  
    //         return res.status(200).json({
    //             users: rows,
    //             totalCount,
    //         });
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //         return res.status(500).json({ message: "Server error" });
    //     }
    // }
 async getAllUsers(req: Request, res: Response) {
      try {
        const skip = req.query.skip ? JSON.parse(req.query.skip as string) : null;
        const take = req.query.take ? JSON.parse(req.query.take as string) : null;
        const sort = req.query.sort ? JSON.parse(req.query.sort as string) : [];
        const filter = req.query.filter ? JSON.parse(req.query.filter as string) : [];
        console.log(skip)
        console.log(take)
        if(!skip && !take){
             const query = `
            SELECT *
            FROM users`;
             const [rows]: any = await pool.query(query);
             res.json({ data: rows });
        }
        else{
        let whereClause = "";
        let orderClause = "";
        if (filter.length === 3) {
            const [field, operator] = filter;
            if (operator === "=") whereClause = `WHERE ${field} = ?`;
            else if (operator === "contains") whereClause = `WHERE ${field} LIKE ?`;
        }
        if (sort.length > 0) {
            const sortField = sort[0].selector;
            const sortOrder = sort[0].desc ? "DESC" : "ASC";
            orderClause = `ORDER BY ${sortField} ${sortOrder}`;
        }
        const query = `
            SELECT id, name, email, role, age, gender, religion, blood_group
            FROM users
            ${whereClause}
            ${orderClause}
            LIMIT ? OFFSET ?`;
        const params: any[] = [];
        if (whereClause.includes("LIKE")) params.push(`%${filter[2]}%`);
        else if (whereClause) params.push(filter[2]);
        params.push(take, skip);
        const [rows]: any = await pool.query(query, params);
        const [countResult]: any = await pool.query("SELECT COUNT(*) AS total FROM users");
        const total = countResult[0].total;
        res.json({ data: rows, totalCount: total });
        }
    } 
    catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users", error: err });
    }
    }
     async deleteUser(req: Request, res: Response) {
        const { id } = req.params
        try {
            const [result] = await pool.query('DELETE FROM users WHERE id=?', [id])
            return res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error" });   
        }
    }
    
  async editUser(req: Request, res: Response) {
        const { id } = req.params;
        const fields = req.body;

        if (!Object.keys(fields).length) {
            return res.status(400).json({ message: "No fields to update" });
        }

        const setQuery = Object.keys(fields)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(fields);

        try {
            const [result]: any = await pool.query(
                `UPDATE users SET ${setQuery} WHERE id = ?`,
                [...values, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ message: "User updated successfully" });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Server error", error });
        }
    }
}
export default allUsersController