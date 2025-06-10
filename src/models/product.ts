import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  code: {
    type: String,
    required: [true, "Código do produto é obrigatório"],
    trim: true,
    maxlength: [20, "Código não pode exceder 20 caracteres"],
  },
  name: {
    type: String,
    required: [true, "Nome do produto é obrigatório"],
    trim: true,
    maxlength: [100, "Nome não pode exceder 100 caracteres"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Descrição não pode exceder 500 caracteres"],
  },
  category: {
    type: String,
    required: [true, "Categoria é obrigatória"],
    trim: true,
  },
  supplier: {
    type: mongoose.Schema.Types.Mixed, // Changed to Mixed to support both ObjectId and string
    required: [false, "Fornecedor é obrigatório"],
    // Can be an ObjectId reference or the string "proprio"
  },
  costPrice: {
    type: Number,
    required: [true, "Preço de custo é obrigatório"],
    min: [0, "Preço de custo não pode ser negativo"],
  },
  sellingPrice: {
    type: Number,
    required: [true, "Preço de venda é obrigatório"],
    min: [0, "Preço de venda não pode ser negativo"],
  },
  minStock: {
    type: Number,
    required: [true, "Estoque mínimo é obrigatório"],
    default: 0,
    min: [0, "Estoque mínimo não pode ser negativo"],
  },
  currentStock: {
    type: Number,
    required: [true, "Estoque atual é obrigatório"],
    default: 0,
    min: [0, "Estoque atual não pode ser negativo"],
  },
  status: {
    type: String,
    enum: ["Ativo", "Inativo", "Estoque Baixo", "Sem Estoque"],
    default: "Ativo",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware para atualizar o status com base no estoque
productSchema.pre("save", function (next) {
  if (this.currentStock === 0) {
    this.status = "Sem Estoque"
  } else if (this.currentStock <= this.minStock) {
    this.status = "Estoque Baixo"
  } else {
    this.status = "Ativo"
  }
  this.updatedAt = new Date()
  next()
})

// Compound index to ensure code uniqueness per user
productSchema.index({ userId: 1, code: 1 }, { unique: true })

export default mongoose.models.Product || mongoose.model("Product", productSchema)
