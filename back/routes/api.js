// routes/item.ts (or any other route file)
import {Router} from 'express';
import prisma from '../prisma.js'; // adjust the path as necessary

const router = Router();

// Get all items
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany();
    console.log(medicines);
    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while fetching items.'});
  }
});

// Save new medicine
router.post('/medicines', async (req, res) => {
  const {
    name,
    components,
    category,
    concentration,
    bestUsedBy,
    stock,
    // instances,
  } = req.body;
  try {
    const newMedicine = await prisma.medicine.create({
      data: {
        name,
        components,
        category,
        concentration,
        bestUsedBy,
        stock,
        // instances,
      },
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default router;
