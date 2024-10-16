const prisma = require("./prisma");
app.post("/reservations", async (req, res, next) => {
  try {
    const { date, restaurantId, customerIds } = req.body;

    // Converts array of ids into shape needed for `connect`
    const party = customerIds.map((id) => ({ id: +id }));

    const reservation = await prisma.reservation.create({
      data: {
        date,
        restaurantId: +restaurantId,
        party: { connect: party },
      },
      include: {
        restaurant: true,
        party: true,
      },
    });
    res.status(201).json(reservation);
  } catch (e) {
    next(e);
  }
});