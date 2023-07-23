const router = require('express').Router()


const { verifytoken, verifyTokenAndAutherization, verifyTokenAdmin } = require('./verifyToken')
const Order = require('../model/Order')



router.post("/", verifytoken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.put("/:id", verifyTokenAdmin, async (req, res) => {
    const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,

        },
        { new: true }
    )
})


router.delete('/:id', verifyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has deleted')
    } catch (er) {
        res.status(500).json(er)
    }
})


router.get('/find/:userId', verifyTokenAndAutherization, async (req, res) => {
    try {
        const Orders = await Order.findOne({ userId: req.params.userId })
        res.status(200).json(Orders)
    } catch (e) {
        res.status(500).json(e)
    }
});
router.get('/find', verifyTokenAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get("/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                }
            }, // Removed the comma here
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            },
        ]);
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router