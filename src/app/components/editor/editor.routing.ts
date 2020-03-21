import {Routes} from "@angular/router";
import {FroalaEditComponent} from "./froala-edit/froala-edit.component";
import {QuillEditComponent} from "./quill-edit/quill-edit.component";

export const EditorRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Editor',
            status: false
        },
        children: [
            {
                path: 'froala-edit',
                component: FroalaEditComponent,
                data: {
                    breadcrumb: 'Froala WYSIWYG Editor',
                    status: true
                }
            }, {
                path: 'quill-edit',
                component: QuillEditComponent,
                data: {
                    breadcrumb: 'Quill Editor',
                    status: true
                }
            }
        ]
    }
]
