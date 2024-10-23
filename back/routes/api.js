// routes/item.ts (or any other route file)
import {Router} from 'express';
import prisma from '../prisma.js'; // adjust the path as necessary

const router = Router();

const updateClosestExpirationDate = async (medicineId) => {
  // Find the earliest expiration date from instances
  const closestExpiration = await prisma.instance.findFirst({
    where: {medicineId: parseInt(medicineId)}, // Filter by medicine ID
    orderBy: {
      endDate: 'asc', // Sort by the earliest expiration date
    },
    select: {
      endDate: true, // Select only the expirationDate field
    },
  });

  // If there are instances, update the closestExpirationDate field in Medicine
  if (closestExpiration) {
    await prisma.medicine.update({
      where: {id: parseInt(medicineId)},
      data: {bestUsedBy: closestExpiration.endDate},
    });
  } else {
    // If no instances, reset closestExpirationDate to null
    await prisma.medicine.update({
      where: {id: parseInt(medicineId)},
      data: {bestUsedBy: null},
    });
  }
};

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
    unit,
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
        unit,
        // instances,
      },
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Update medicine
router.patch('/medicines/:id', async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  try {
    const medicineUpdated = await prisma.medicine.update({
      where: {id: parseInt(id)},
      data: data,
    });
    res.status(201).json(medicineUpdated);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Delete medicine
router.delete('/medicines/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const deleteMedicine = await prisma.medicine.delete({
      where: {id: parseInt(id)},
    });
    res.status(201).json(deleteMedicine);
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
  const {medicineId, endDate, quantity} = req.body;
  try {
    const newInstance = await prisma.instance.create({
      data: {
        medicineId,
        endDate,
        quantity,
      },
    });
    // Recalculate total stock
    const totalStock = await prisma.instance.aggregate({
      where: {medicineId: parseInt(medicineId)},
      _sum: {quantity: true},
    });
    // Update medicine stock
    const updatedMedicine = await prisma.medicine.update({
      where: {id: parseInt(medicineId)},
      data: {stock: totalStock._sum.quantity || 0},
    });
    // Update closest expiration date
    await updateClosestExpirationDate(medicineId);

    res.status(201).json(newInstance);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Update instance
router.patch('/medicines/:medicineId/items/:id', async (req, res) => {
  const {medicineId, id} = req.params;
  const data = req.body;
  try {
    const updateInstance = await prisma.instance.update({
      where: {id: parseInt(id)},
      data: data,
    });
    // Recalculate total stock
    const totalStock = await prisma.instance.aggregate({
      where: {medicineId: parseInt(medicineId)},
      _sum: {quantity: true},
    });
    // Update medicine stock
    await prisma.medicine.update({
      where: {id: parseInt(medicineId)},
      data: {stock: totalStock._sum.quantity || 0},
    });
    // Update closest expiration date
    await updateClosestExpirationDate(medicineId);

    res.status(201).json(updateInstance);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Delete instance
router.delete('/medicines/:medicineId/items/:id', async (req, res) => {
  const {medicineId, id} = req.params;
  try {
    const deleteInstance = await prisma.instance.delete({
      where: {medicineId: parseInt(medicineId), id: parseInt(id)},
    });
    // Recalculate total stock
    const totalStock = await prisma.instance.aggregate({
      where: {medicineId: parseInt(medicineId)},
      _sum: {quantity: true},
    });
    // Update medicine stock
    await prisma.medicine.update({
      where: {id: parseInt(medicineId)},
      data: {stock: totalStock._sum.quantity || 0},
    });
    // Update closest expiration date
    await updateClosestExpirationDate(medicineId);

    res.status(201).json(deleteInstance);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({error: 'An error occurred while fetching categroies.'});
  }
});

// Save new category
router.post('/categories', async (req, res) => {
  const {name} = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

export default router;
