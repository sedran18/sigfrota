"use client"

import { GetFuelingRequestType } from "@/schemas/fuelingRequest.schema"
import { dateToStringDate } from "@/lib/utils"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

const PrintOrderButton = ({ data }: { data: GetFuelingRequestType }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=700')
    if (!printWindow) return

    const litrosLabel = data.liters === 'FULL' ? 'ENCHER TANQUE' : `${data.liters} LITROS`
    const combustivel = data.fuelType.replace(/_/g, ' ')

    printWindow.document.documentElement.innerHTML = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Ordem de Abastecimento - #${data.id.slice(0, 8).toUpperCase()}</title>
          <style>
            @page { size: a6 portrait; margin: 1mm; }
            * { 
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 8px;
              background-color: #ffffff;
            }
            .container {
              border: 1px solid #cbd5e1;
              padding: 10px;
              margin: auto;
              border-radius: 4px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #093a1c;
              padding-bottom: 6px;
              margin-bottom: 8px;
            }
            .logo {
              max-width: 110px;
              margin: 2px;
            }
            .header h1 {
              font-size: 11px;
              margin: 2px 0 0 0;
              text-transform: uppercase;
              letter-spacing: 1px;
              color: #093a1c;
              font-weight: 800;
            }
            .header p {
              font-size: 7.5px;
              margin: 2px 0 0;
              color: #64748b;
              font-weight: 500;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 6px;
              margin-bottom: 6px;
            }
            .field {
              font-size: 8.5px;
              line-height: 1.2;
              background-color: #f8fafc;
              padding: 5px;
              border-radius: 3px;
              border: 1px solid #e2e8f0;
            }
            .field.full {
              grid-column: span 2;
            }
            .field .label {
              display: block;
              font-size: 6.5px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #64748b;
              font-weight: 700;
              margin-bottom: 1px;
            }
            .field .value {
              font-weight: 700;
              font-size: 9.5px;
              text-transform: uppercase;
              color: #0f172a;
            }
            .liters-box {
              text-align: center;
              background: #f0fdf4;
              border: 1.5px dashed #093a1c;
              border-radius: 4px;
              padding: 6px;
              margin: 6px 0;
            }
            .liters-box .label {
              display: block;
              font-size: 7.5px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #166534;
              font-weight: 700;
            }
            .liters-box .value {
              font-size: 13px;
              font-weight: 900;
              color: #093a1c;
              letter-spacing: 0.5px;
            }

            .manual-fill-container {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 6px;
              margin: 8px 0;
            }
            .manual-box {
              border: 1px dashed #64748b;
              background-color: #ffffff;
              padding: 6px;
              border-radius: 3px;
              height: 38px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .manual-box .label {
              font-size: 6.5px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #475569;
              font-weight: 800;
            }

            .signatures { 
              margin-top: 18px; 
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .sign-line .line { 
              border-top: 1px solid #334155; 
              margin-bottom: 2px; 
            }
            .sign-line .caption {
              text-align: center;
              font-size: 7px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              color: #475569;
            }
            .footer {
              margin-top: 8px;
              padding-top: 4px;
              border-top: 1px solid #f1f5f9;
              font-size: 6.5px;
              color: #94a3b8;
              text-align: center;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="/logo.png" alt="Logo" class="logo" />
              <h1>Ordem de Abastecimento</h1>
              <p>Emitida em ${dateToStringDate(new Date())}</p>
            </div>

            <div class="grid">
              <div class="field full">
                <span class="label">Veículo</span>
                <span class="value">${data.vehicle.brand} ${data.vehicle.model} • ${data.vehicle.plate}</span>
              </div>

              <div class="field full">
                <span class="label">Motorista</span>
                <span class="value">${data.driver.name}</span>
              </div>

              <div class="field full">
                <span class="label">Posto de Combustível</span>
                <span class="value">${data.contractFuel.contract.gasStation.name}</span>
              </div>

              <div class="field">
                <span class="label">Combustível</span>
                <span class="value">${combustivel}</span>
              </div>

              <div class="field">
                <span class="label">Odômetro Inicial</span>
                <span class="value">${data.odometer ? `${data.odometer.toLocaleString()} KM` : 'N/I'}</span>
              </div>
            </div>

            <div class="liters-box">
              <span class="label">Volume Autorizado</span>
              <span class="value">${litrosLabel}</span>
            </div>

            <div class="manual-fill-container">
              <div class="manual-box">
                <span class="label">KM Final</span>
              </div>
              <div class="manual-box">
                <span class="label">Litros Abastecidos</span>
              </div>
            </div>

            <div class="signatures">
              <div class="sign-line">
                <div class="line"></div>
                <div class="caption">Assinatura do Motorista</div>
              </div>
              <div class="sign-line">
                <div class="line"></div>
                <div class="caption">Responsável pelo Abastecimento</div>
              </div>
            </div>

            <div class="footer">
              ORDEM Nº ${data.id.slice(0, 8).toUpperCase()}
            </div>
          </div>
        </body>
      </html>
    `

    printWindow.focus()

    setTimeout(() => {
      printWindow.print()
    }, 300)
  }

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="w-full sm:w-auto h-10 sm:h-11 border-slate-300 text-slate-900 bg-white font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded-none px-4 gap-2 cursor-pointer hover:bg-slate-50 hover:text-slate-950 transition-all shadow-sm shrink-0"
    >
      <Printer size={14} className="sm:w-4 sm:h-4 shrink-0" />
      Imprimir
    </Button>
  )
}

export default PrintOrderButton;