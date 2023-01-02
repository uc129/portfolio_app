import {Link, RichTextEditor} from '@mantine/tiptap';
import {useEditor} from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {Color} from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {IconColorPicker} from "@tabler/icons";
import {useEffect, useState} from "react";
import axios from "axios";

const content = '<p>Start editing me! <a href="https://mantine.dev">Mantine</a></p>';

function TextEditor({pushLink}: any) {
    const [editorData, setEditorData] = useState();
    const [save, setSave] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({types: ['heading', 'paragraph']}),
        ],
        content,
    });
    const handleClick=()=>{
        setSave(true)
        // @ts-ignore
        setEditorData(editor?.getHTML())
    }
    useEffect(() => {
        // @ts-ignore
            save && editorData && axios.post(pushLink, {data: editorData}).then(r => console.log(r))
            setSave(false)

    }, [editorData,save])
    return (
        <>
        <RichTextEditor editor={editor} style={{height:'400px',background:'white', maxHeight:'400px'}}>
            <RichTextEditor.Toolbar sticky stickyOffset={60} >
                <RichTextEditor.ColorPicker
                    colors={[
                        '#25262b',
                        '#868e96',
                        '#fa5252',
                        '#e64980',
                        '#be4bdb',
                        '#7950f2',
                        '#4c6ef5',
                        '#228be6',
                        '#15aabf',
                        '#12b886',
                        '#40c057',
                        '#82c91e',
                        '#fab005',
                        '#fd7e14',
                    ]}
                />
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold/>
                    <RichTextEditor.Italic/>
                    <RichTextEditor.Underline/>
                    <RichTextEditor.Strikethrough/>
                    <RichTextEditor.ClearFormatting/>
                    <RichTextEditor.Highlight/>
                    <RichTextEditor.Code/>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1/>
                    <RichTextEditor.H2/>
                    <RichTextEditor.H3/>
                    <RichTextEditor.H4/>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Control interactive={false}>
                        <IconColorPicker size={16} stroke={1.5}/>
                    </RichTextEditor.Control>
                    <RichTextEditor.Color color="#F03E3E"/>
                    <RichTextEditor.Color color="#7048E8"/>
                    <RichTextEditor.Color color="#1098AD"/>
                    <RichTextEditor.Color color="#37B24D"/>
                    <RichTextEditor.Color color="#F59F00"/>
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.UnsetColor/>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote/>
                    <RichTextEditor.Hr/>
                    <RichTextEditor.BulletList/>
                    <RichTextEditor.OrderedList/>
                    <RichTextEditor.Subscript/>
                    <RichTextEditor.Superscript/>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link/>
                    <RichTextEditor.Unlink/>
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft/>
                    <RichTextEditor.AlignCenter/>
                    <RichTextEditor.AlignJustify/>
                    <RichTextEditor.AlignRight/>
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content/>

        </RichTextEditor>
            {/*@ts-ignore*/}
            <button onClick={()=> handleClick()} >Save</button>
    </>
    );
}

export default TextEditor
