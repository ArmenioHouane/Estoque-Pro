import mongoose from "mongoose"

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome da empresa é obrigatório"],
    trim: true,
    maxlength: [100, "Nome não pode exceder 100 caracteres"],
  },
  nuit: {
    type: String,
    required: [true, "NUIT é obrigatório"],
    unique: true,
    trim: true,
    
  },
  contactName: {
    type: String,
    required: [true, "Nome do contato é obrigatório"],
    trim: true,
  },
  contactRole: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    trim: true,
    lowercase: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Formato de email inválido",
    },
  },
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    trim: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  address: {
    zipCode: {
      type: String,
      trim: true,
    },
    street: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    complement: {
      type: String,
      trim: true,
    },
    neighborhood: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "Brasil",
    },
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Observações não podem exceder 500 caracteres"],
  },
  status: {
    type: String,
    enum: ["Ativo", "Inativo"],
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

// Atualizar data de modificação
supplierSchema.pre("save", function (next) {
  this.updatedAt = new Date()
  next()
})

export default mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema)
