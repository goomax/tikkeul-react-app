import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createComponentFile = async (componentName) => {
  if (!componentName) {
    console.error('No component name provided.');
    process.exit(1);
  }

  const filePath = path.join(__dirname, '../src/components/icons', `${componentName}.tsx`);
  const content = `
import { SVGProps } from 'react';

const ${componentName} = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <></>
  );
};

export default ${componentName};
`;

  try {
    await fs.promises.writeFile(filePath, content.trim());
    console.log(`${componentName}.tsx has been successfully created!`);
    await formatFileWithPrettier(filePath);
  } catch (err) {
    console.error('Failed to create the component file:', err);
  }
};

const formatFileWithPrettier = async (filePath) => {
  try {
    const { default: prettier } = await import('prettier');
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const formattedContent = await prettier.format(fileContent, {
      parser: 'typescript',
      ...(await prettier.resolveConfig(filePath)),
    });

    await fs.promises.writeFile(filePath, formattedContent);
    console.log('Formatted with Prettier successfully!');
  } catch (err) {
    console.error('Failed to format file with Prettier:', err);
  }
};

const componentName = process.argv[2];
createComponentFile(componentName);
