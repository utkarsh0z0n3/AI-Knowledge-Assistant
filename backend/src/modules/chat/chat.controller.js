import Chat from "./chat.model.js";

export const getMyHistory = async(req, res) => {
    const chats = await Chat.findAll({
        where: {user_id: req.user.id},
        order: [["createdAt", "DESC"]],
    });
    res.json(chats);
};