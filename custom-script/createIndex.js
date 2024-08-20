import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const folderPath = process.argv[2];

if (!folderPath) {
  console.error('폴더 경로를 입력해주세요.');
  process.exit(1);
}

const createIndexFile = async (folderPath) => {
  try {
    const files = await fs.promises.readdir(folderPath);
    const fileNames = files.filter((file) => file.endsWith('.tsx')).map((file) => path.parse(file).name);

    const content = fileNames.map((fileName) => `export { default as ${fileName} } from './${fileName}';`).join('\n');

    await fs.promises.writeFile(path.join(folderPath, 'index.ts'), content);
    console.log('index.ts 파일이 작성되었습니다.');
  } catch (err) {
    console.error('Error reading or writing files:', err);
  }
};

createIndexFile(folderPath);
