import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
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
  unitPrice: {
    type: Number,
    required: [true, "Preço unitário é obrigatório"],
    min: [0, "Preço unitário não pode ser negativo"],
  },
  subtotal: {
    type: Number,
    required: [true, "Subtotal é obrigatório"],
  },
})

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  orderNumber: {
    type: String,
    required: [true, "Número do pedido é obrigatório"],
    trim: true,
  },
  customer: {
    name: {
      type: String,
      required: [true, "Nome do cliente é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Formato de email inválido",
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: [true, "Valor total é obrigatório"],
    min: [0, "Valor total não pode ser negativo"],
  },
  status: {
    type: String,
    enum: ["Pendente", "Aprovado", "Enviado", "Entregue", "Cancelado"],
    default: "Pendente",
    required: [true, "Status é obrigatório"],
  },
  paymentMethod: {
    type: String,
    enum: ["Dinheiro", "Cartão de Crédito", "Cartão de Débito", "PIX", "Boleto Bancário", "Transferência Bancária"],
    required: [true, "Método de pagamento é obrigatório"],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Observações não podem exceder 500 caracteres"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Usuário criador é obrigatório"],
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

// Gerar número de pedido automaticamente (#PED + número sequencial) por usuário
orderSchema.pre("save", async function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date()
    return next()
  }

  try {
    const Order = mongoose.model("Order")
    const lastOrder = await Order.findOne({ userId: this.userId }, {}, { sort: { createdAt: -1 } })

    let newId = 1
    if (lastOrder && lastOrder.orderNumber) {
      const lastIdNumber = Number.parseInt(lastOrder.orderNumber.replace("#PED", ""))
      if (!isNaN(lastIdNumber)) {
        newId = lastIdNumber + 1
      }
    }

    this.orderNumber = `#PED${newId.toString().padStart(3, "0")}`
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Compound index to ensure orderNumber uniqueness per user
orderSchema.index({ userId: 1, orderNumber: 1 }, { unique: true })

export default mongoose.models.Order || mongoose.model("Order", orderSchema)
