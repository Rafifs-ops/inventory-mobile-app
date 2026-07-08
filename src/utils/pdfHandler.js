import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { useToast } from '../composables/useToast';

const { showToast } = useToast();

export const saveAndSharePDF = async (doc, filename) => {
    try {
        // 1. Sanitasi: Hilangkan karakter yang dilarang pada sistem file (seperti / \ : * ? " < > |)
        let safeFilename = filename.replace(/[/\\?%*:|"<>]/g, '-');

        // 2. Pastikan file selalu memiliki ekstensi .pdf di akhirnya
        if (!safeFilename.toLowerCase().endsWith('.pdf')) {
            safeFilename += '.pdf';
        }

        if (Capacitor.isNativePlatform()) {
            // Dapatkan output PDF
            const pdfDataUri = doc.output('datauristring');

            // 3. Ekstrak base64 dengan mencari indeks yang pasti (menghindari error karena tanda koma)
            const base64Index = pdfDataUri.indexOf('base64,') + 7;
            const pdfBase64 = pdfDataUri.substring(base64Index);

            // Simpan sementara ke folder Cache
            const savedFile = await Filesystem.writeFile({
                path: safeFilename,
                data: pdfBase64,
                directory: Directory.Cache,
            });

            // Munculkan dialog native untuk membagikan/membuka/menyimpan file
            await Share.share({
                title: safeFilename,
                url: savedFile.uri,
                dialogTitle: 'Buka atau Simpan PDF'
            });
        } else {
            // Fallback untuk web browser
            doc.save(safeFilename);
        }
    } catch (error) {
        console.error('Error saat menyimpan atau membagikan PDF:', error);
        showToast('Gagal menyimpan dokumen. Pastikan penyimpanan perangkat Anda cukup dan coba kembali.', 'error');
    }
};