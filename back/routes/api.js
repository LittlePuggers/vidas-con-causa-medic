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

export default router;
