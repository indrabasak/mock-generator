import fs from 'fs';
import type { JsonValue } from 'type-fest';

class FileUtil {
  public static write(
    responses: Array<JsonValue>,
    dir: string,
    prefix: string
  ): void {
    for (let i = 0; i < responses.length; i += 1) {
      try {
        const path = `${dir}/${prefix}-${i}.json`;
        fs.writeFileSync(path, JSON.stringify(responses[i], null, 2));
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export default FileUtil;
