const fs = require('fs');
let file = 'src/app/admin/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldImageUpload = `  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const url = await uploadProductImage(base64, file.type);
        if (!url) throw new Error('Failed to get URL');
        onChange(url);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Try using a URL instead.');
      setUploading(false);
    }
  };`;

const newImageUpload = `  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        const url = await uploadProductImage(base64, file.type);
        if (!url) throw new Error('Failed to get URL');
        onChange(url);
      } catch (err: any) {
        console.error('Upload failed:', err);
        alert('Upload failed: ' + (err.message || 'Try using a URL instead.'));
      } finally {
        setUploading(false);
      }
    };
    reader.onerror = () => {
      alert('Failed to read file');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };`;

content = content.replace(oldImageUpload, newImageUpload);
fs.writeFileSync(file, content);
