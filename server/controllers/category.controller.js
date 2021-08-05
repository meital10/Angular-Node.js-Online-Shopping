const express = require('express');
const router = express.Router();
const categoryService = require('../service/category.service');


//CreateCategory
router.post('/category', async (req, res) => {

    try {
        const newCategory = await categoryService.addCategory(req.body);
        res.status(200).json(newCategory);
    } catch (err) {
        console.log('controller:createCategory err', err.message);
        res.status(500).json({
            message: 'server error'
        })
    }

});

// update 

router.put('/category/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await categoryService.updateCategory(id, data);
        res.json({ success: true });

    } catch (err) {
        console.log('controller: updateCategory err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// get the categories
router.get('/categories', async (req, res) => {

    try {
        const categories = await categoryService.fetchCategory();
        res.json(categories);
    } catch (err) {
        console.log('controller getCategories err', err.message);
        res.status(400).json({
            message: 'server error'
        })
    }

})

// get category by id

router.get('/category/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await categoryService.fetchCategoryId(id);
        res.json(result);
    } catch (err) {
        console.log('controller: getCategoryById err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});

// delete category-admin
router.delete('/category/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await categoryService.deleteCategory(id);
        res.json(result);
    } catch (err) {
        console.log('controller:deleteCategory err', err.message);
        res.status(500).json({
            message: 'server error'
        });
    }
});


module.exports = router;