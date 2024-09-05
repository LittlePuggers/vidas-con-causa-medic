// routes/item.ts (or any other route file)
import {Router} from 'express';
import prisma from '../prisma.js'; // adjust the path as necessary

const router = Router();

// Get all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany();
    console.log(medicines);
    res.json(medicines);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: 'An error occurred while fetching medicines.'});
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

// Get instances of medicine
router.get('/medicines/:id/items', async (req, res) => {
  const medicineId = parseInt(req.params.id);
  try {
    const items = await prisma.instance.findMany({
      where: {
        medicineId: medicineId,
      },
    });
    console.log(items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while fetching items.'});
  }
});

// Save new instance
router.post('/medicines/:id/items', async (req, res) => {
  const {medicineId, endDate, quantity, unit} = req.body;
  try {
    const newInstance = await prisma.instance.create({
      data: {
        medicineId,
        endDate,
        quantity,
        unit,
      },
    });
    res.status(201).json(newInstance);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Update instance
router.put('/medicines/:medicineId/items/:id', async (req, res) => {
  const {medicineId, id} = req.params;
  const {endDate, quantity, unit} = req.body;
  try {
    const updateInstance = await prisma.instance.update({
      where: {medicineId: parseInt(medicineId), id: parseInt(id)},
      data: {
        endDate,
        quantity,
        unit,
      },
    });
    res.status(201).json(updateInstance);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default router;
