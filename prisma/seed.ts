import { PrismaClient } from "../lib/generated/prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando a execução do seed completo...')

  // 1. Limpeza em ordem reversa para respeitar as Foreign Keys
  await prisma.fueling.deleteMany()
  await prisma.fuelingRequest.deleteMany()
  await prisma.contractFuel.deleteMany()
  await prisma.contract.deleteMany()
  await prisma.gasStation.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.driver.deleteMany()

  // 2. MOTORISTAS
  const carlos = await prisma.driver.create({ data: { name: 'Carlos Silva', phone: '(11) 98888-1111', active: true } })
  const ana = await prisma.driver.create({ data: { name: 'Ana Souza', phone: '(11) 98888-2222', active: true } })
  const joao = await prisma.driver.create({ data: { name: 'João Pedro', phone: '(11) 98888-3333', active: true } })
  const sandro = await prisma.driver.create({ data: { name: 'Sandro Oliveira', phone: '(11) 98888-4444', active: true } })
  const mariana = await prisma.driver.create({ data: { name: 'Mariana Lima', phone: '(11) 98888-5555', active: true } })

  // 3. VEÍCULOS (Com variados tipos de combustível)
  const volvo = await prisma.vehicle.create({
    data: {
      plate: 'ABC1D23',
      model: 'FH 540',
      brand: 'Volvo',
      year: 2022,
      fuelType: 'DIESEL_S10',
      tankCapacity: 500.0,
      conservationStatus: 'GOOD',
      averageConsumption: 2.8,
      currentOdometer: 152000,
      active: true,
    },
  })

  const scania = await prisma.vehicle.create({
    data: {
      plate: 'XYZ9K87',
      model: 'R450',
      brand: 'Scania',
      year: 2021,
      fuelType: 'DIESEL_COMUM',
      tankCapacity: 450.0,
      conservationStatus: 'GOOD',
      averageConsumption: 3.1,
      currentOdometer: 212000,
      active: true,
    },
  })

  const strada = await prisma.vehicle.create({
    data: {
      plate: 'MNO4P56',
      model: 'Strada 1.4',
      brand: 'Fiat',
      year: 2023,
      fuelType: 'FLEX',
      tankCapacity: 55.0,
      conservationStatus: 'GOOD',
      averageConsumption: 11.5,
      currentOdometer: 45000,
      active: true,
    },
  })

  const gol = await prisma.vehicle.create({
    data: {
      plate: 'JKL7R89',
      model: 'Gol 1.0',
      brand: 'Volkswagen',
      year: 2020,
      fuelType: 'GASOLINA',
      tankCapacity: 50.0,
      conservationStatus: 'GOOD',
      averageConsumption: 13.2,
      currentOdometer: 82000,
      active: true,
    },
  })

  // 4. POSTOS DE COMBUSTÍVEL
  const postoGraal = await prisma.gasStation.create({
    data: { name: 'Posto Shell Graal', cnpj: '12.345.678/0001-90', active: true, address: 'Rodovia Dutra, Km 200' },
  })

  const postoIpiranga = await prisma.gasStation.create({
    data: { name: 'Posto Ipiranga Centro', cnpj: '98.765.432/0001-10', active: true, address: 'Av. Brasil, 1500' },
  })

  // 5. CONTRATOS
  const contratoGraal = await prisma.contract.create({
    data: { contractNumber: 'CT-2026-001', startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), gasStationId: postoGraal.id, active: true },
  })

  const contratoIpiranga = await prisma.contract.create({
    data: { contractNumber: 'CT-2026-002', startDate: new Date('2026-01-01'), endDate: new Date('2026-12-31'), gasStationId: postoIpiranga.id, active: true },
  })

  // 6. COMBUSTÍVEIS DOS CONTRATOS (Vários tipos e preços)
  const dieselS10Graal = await prisma.contractFuel.create({
    data: { contractId: contratoGraal.id, fuelType: 'DIESEL_S10', pricePerLiter: 6.20, litersContracted: 30000, litersAvailable: 22000, litersConsumed: 8000 },
  })

  const dieselComumGraal = await prisma.contractFuel.create({
    data: { contractId: contratoGraal.id, fuelType: 'DIESEL_COMUM', pricePerLiter: 5.95, litersContracted: 20000, litersAvailable: 15000, litersConsumed: 5000 },
  })

  const gasolinaComumIpiranga = await prisma.contractFuel.create({
    data: { contractId: contratoIpiranga.id, fuelType: 'GASOLINA_COMUM', pricePerLiter: 5.80, litersContracted: 10000, litersAvailable: 8500, litersConsumed: 1500 },
  })

  const gasolinaAditivadaIpiranga = await prisma.contractFuel.create({
    data: { contractId: contratoIpiranga.id, fuelType: 'GASOLINA_ADITIVADA', pricePerLiter: 6.05, litersContracted: 10000, litersAvailable: 9000, litersConsumed: 1000 },
  })

  const etanolIpiranga = await prisma.contractFuel.create({
    data: { contractId: contratoIpiranga.id, fuelType: 'ETANOL', pricePerLiter: 3.90, litersContracted: 15000, litersAvailable: 12000, litersConsumed: 3000 },
  })

  // Helper de Datas
  const daysAgo = (days: number) => {
    const d = new Date()
    d.setDate(d.getDate() - days)
    return d
  }

  // 7. ABASTECIMENTOS E SOLICITAÇÕES DIVERSIFICADOS

  // --- 1. Volvo + Carlos (Diesel S10)
  const req1 = await prisma.fuelingRequest.create({
    data: { vehicleId: volvo.id, driverId: carlos.id, contractFuelId: dieselS10Graal.id, liters: '200', fuelType: 'DIESEL_S10', odometer: 148500, status: 'COMPLETED', createdAt: daysAgo(25) },
  })
  await prisma.fueling.create({
    data: { vehicleId: volvo.id, driverId: carlos.id, requestId: req1.id, contractFuelId: dieselS10Graal.id, fuelType: 'DIESEL_S10', odometer: 148500, liters: 200, pricePerLiter: 6.20, totalAmount: 1240, distanceTraveled: 580, fuelEfficiency: 2.90, observations: 'Rota SP-RJ', createdAt: daysAgo(25) },
  })

  // --- 2. Volvo + Ana (Diesel S10)
  const req2 = await prisma.fuelingRequest.create({
    data: { vehicleId: volvo.id, driverId: ana.id, contractFuelId: dieselS10Graal.id, liters: '180', fuelType: 'DIESEL_S10', odometer: 149500, status: 'COMPLETED', createdAt: daysAgo(18) },
  })
  await prisma.fueling.create({
    data: { vehicleId: volvo.id, driverId: ana.id, requestId: req2.id, contractFuelId: dieselS10Graal.id, fuelType: 'DIESEL_S10', odometer: 149500, liters: 180, pricePerLiter: 6.20, totalAmount: 1116, distanceTraveled: 400, fuelEfficiency: 2.22, observations: 'Trânsito pesado', createdAt: daysAgo(18) },
  })

  // --- 3. Scania + João (Diesel Comum)
  const req3 = await prisma.fuelingRequest.create({
    data: { vehicleId: scania.id, driverId: joao.id, contractFuelId: dieselComumGraal.id, liters: '250', fuelType: 'DIESEL_COMUM', odometer: 209500, status: 'COMPLETED', createdAt: daysAgo(20) },
  })
  await prisma.fueling.create({
    data: { vehicleId: scania.id, driverId: joao.id, requestId: req3.id, contractFuelId: dieselComumGraal.id, fuelType: 'DIESEL_COMUM', odometer: 209500, liters: 250, pricePerLiter: 5.95, totalAmount: 1487.50, distanceTraveled: 780, fuelEfficiency: 3.12, observations: 'Pista dupla', createdAt: daysAgo(20) },
  })

  // --- 4. Fiat Strada + Mariana (Etanol)
  const req4 = await prisma.fuelingRequest.create({
    data: { vehicleId: strada.id, driverId: mariana.id, contractFuelId: etanolIpiranga.id, liters: '45', fuelType: 'ETANOL', odometer: 43500, status: 'COMPLETED', createdAt: daysAgo(15) },
  })
  await prisma.fueling.create({
    data: { vehicleId: strada.id, driverId: mariana.id, requestId: req4.id, contractFuelId: etanolIpiranga.id, fuelType: 'ETANOL', odometer: 43500, liters: 45, pricePerLiter: 3.90, totalAmount: 175.50, distanceTraveled: 380, fuelEfficiency: 8.44, observations: 'Entregas urbanas', createdAt: daysAgo(15) },
  })

  // --- 5. Fiat Strada + Ana (Gasolina Comum)
  const req5 = await prisma.fuelingRequest.create({
    data: { vehicleId: strada.id, driverId: ana.id, contractFuelId: gasolinaComumIpiranga.id, liters: '48', fuelType: 'GASOLINA_COMUM', odometer: 44100, status: 'COMPLETED', createdAt: daysAgo(8) },
  })
  await prisma.fueling.create({
    data: { vehicleId: strada.id, driverId: ana.id, requestId: req5.id, contractFuelId: gasolinaComumIpiranga.id, fuelType: 'GASOLINA_COMUM', odometer: 44100, liters: 48, pricePerLiter: 5.80, totalAmount: 278.40, distanceTraveled: 550, fuelEfficiency: 11.45, observations: 'Rota rodoviária', createdAt: daysAgo(8) },
  })

  // --- 6. VW Gol + Sandro (Gasolina Aditivada)
  const req6 = await prisma.fuelingRequest.create({
    data: { vehicleId: gol.id, driverId: sandro.id, contractFuelId: gasolinaAditivadaIpiranga.id, liters: '40', fuelType: 'GASOLINA_ADITIVADA', odometer: 81200, status: 'COMPLETED', createdAt: daysAgo(12) },
  })
  await prisma.fueling.create({
    data: { vehicleId: gol.id, driverId: sandro.id, requestId: req6.id, contractFuelId: gasolinaAditivadaIpiranga.id, fuelType: 'GASOLINA_ADITIVADA', odometer: 81200, liters: 40, pricePerLiter: 6.05, totalAmount: 242.00, distanceTraveled: 520, fuelEfficiency: 13.00, observations: 'Visitas técnicas', createdAt: daysAgo(12) },
  })

  // --- 7. VW Gol + Carlos (Gasolina Comum)
  const req7 = await prisma.fuelingRequest.create({
    data: { vehicleId: gol.id, driverId: carlos.id, contractFuelId: gasolinaComumIpiranga.id, liters: '42', fuelType: 'GASOLINA_COMUM', odometer: 81800, status: 'COMPLETED', createdAt: daysAgo(4) },
  })
  await prisma.fueling.create({
    data: { vehicleId: gol.id, driverId: carlos.id, requestId: req7.id, contractFuelId: gasolinaComumIpiranga.id, fuelType: 'GASOLINA_COMUM', odometer: 81800, liters: 42, pricePerLiter: 5.80, totalAmount: 243.60, distanceTraveled: 560, fuelEfficiency: 13.33, observations: 'Uso administrativo', createdAt: daysAgo(4) },
  })

  console.log('✅ Seed rico finalizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante a execução do seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })