import mongoose from "mongoose"

const stockMovementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  movementId: {
    type: String,
    required: [true, "ID do movimento é obrigatório"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["Entrada", "Saída", "Ajuste"],
    required: [true, "Tipo de movimento é obrigatório"],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Produto é obrigatório"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantidade é obrigatória"],
    min: [1, "Quantidade deve ser pelo menos 1"],
  },
  previousStock: {
    type: Number,
    required: [true, "Estoque anterior é obrigatório"],
  },
  newStock: {
    type: Number,
    required: [true, "Novo estoque é obrigatório"],
  },
  reason: {
    type: String,
    enum: ["Compra", "Venda", "Transferência", "Perda", "Ajuste de Inventário", "Outro"],
    required: [true, "Motivo é obrigatório"],
  },
  reference: {
    type: String,
    trim: true,
  },
  supplier: {
    type: mongoose.Schema.Types.Mixed,
    ref: "Supplier",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  responsibleUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Usuário responsável é obrigatório"],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Observações não podem exceder 500 caracteres"],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Data é obrigatória"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Gerar ID de movimento automaticamente (MOV + número sequencial) por usuário
stockMovementSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next()
  }

  try {
    const StockMovement = mongoose.model("StockMovement")
    const lastMovement = await StockMovement.findOne({ userId: this.userId }, {}, { sort: { createdAt: -1 } })

    let newId = 1
    if (lastMovement && lastMovement.movementId) {
      const lastIdNumber = Number.parseInt(lastMovement.movementId.replace("MOV", ""))
      if (!isNaN(lastIdNumber)) {
        newId = lastIdNumber + 1
      }
    }

    this.movementId = `MOV${newId.toString().padStart(3, "0")}`
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compound index to ensure movementId uniqueness per user
stockMovementSchema.index({ userId: 1, movementId: 1 }, { unique: true })

export default mongoose.models.StockMovement || mongoose.model("StockMovement", stockMovementSchema)
