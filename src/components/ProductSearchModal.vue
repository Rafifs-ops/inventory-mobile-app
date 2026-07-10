<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[85vh]">
      <!-- Header -->
      <div class="p-4 sm:p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <h3 class="text-lg font-bold text-slate-900">Cari Produk</h3>
        <button @click="$emit('close')" class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors focus:outline-none">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Search Input -->
      <div class="p-4 sm:p-5 border-b border-slate-100">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama atau ID produk..."
            class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      <!-- Product List -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-slate-50/50">
        <div v-if="filteredProducts.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p class="text-sm font-medium text-slate-500">Tidak ada produk ditemukan.</p>
        </div>

        <div
          v-else
          v-for="produk in filteredProducts"
          :key="produk.id"
          @click="selectProduct(produk)"
          class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-400 hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
        >
          <div class="flex justify-between items-start mb-1.5">
            <h4 class="font-bold text-slate-900 leading-tight">{{ produk.nama }}</h4>
            <span class="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              {{ produk.id }}
            </span>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="text-sm font-bold text-blue-600">
              Rp {{ produk.harga?.toLocaleString('id-ID') }}
            </p>
            <span class="text-xs font-semibold px-2 py-1 rounded-md"
                  :class="produk.quantity > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'">
              Stok: {{ produk.quantity || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useProducts } from '../composables/useProduct';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'select']);

const { productList, loadProducts } = useProducts();
const searchQuery = ref('');

onMounted(() => {
    loadProducts();
});

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        loadProducts(); // Refresh list tiap kali modal dibuka
        searchQuery.value = ''; // Reset pencarian
    }
});

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase();
    if (!query) return productList.value;
    
    return productList.value.filter(p => 
        (p.nama && p.nama.toLowerCase().includes(query)) || 
        (p.id && p.id.toLowerCase().includes(query))
    );
});

const selectProduct = (produk) => {
    emit('select', produk.id);
};
</script>
