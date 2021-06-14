import { PanelPlugin } from '@grafana/data';
import { defaults, VerificationType } from './types';
import { Editor } from 'Editor';
import { Panel } from 'Panel';

export const plugin = new PanelPlugin<VerificationType>(Panel).setPanelOptions((builder) => {
  builder.addCustomEditor({
    id: 'divPanelEdit',
    path: 'editor',
    name: 'Test definition in JSON format',
    editor: Editor,
    defaultValue: defaults,
  });
});
