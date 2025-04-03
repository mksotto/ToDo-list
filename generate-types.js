import {generateApi} from 'swagger-typescript-api';
import path from 'node:path';

const PATH = path.resolve(process.cwd(), "./src/types/domain");
const URL = 'https://raw.githubusercontent.com/mksotto/ToDo-list-api/refs/heads/main/openapi.yaml';

void generateApi({
    fileName: 'todo-list.ts',
    url: URL,
    output: PATH,
    generateClient: false,
    generateUnionEnums: true
});