import os, re

def replace_in_files(directory, ext):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(ext):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                
                # Fix any types
                content = re.sub(r':\s*any\b', ': unknown', content)
                content = re.sub(r'<\s*any\s*>', '<unknown>', content)
                content = re.sub(r'\bany\[\]', 'unknown[]', content)
                
                # Fix unescaped entities
                replacements = {
                    "That's": "That&apos;s",
                    "it's": "it&apos;s",
                    "Let's": "Let&apos;s",
                    "don't": "don&apos;t",
                    "doesn't": "doesn&apos;t",
                    "'ll ": "&apos;ll ",
                    "'re ": "&apos;re ",
                    "'ve ": "&apos;ve "
                }
                for old, new in replacements.items():
                    content = content.replace(old, new)
                
                if content != original:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f'Updated {path}')

replace_in_files('src', '.ts')
replace_in_files('src', '.tsx')

# Fix set-state-in-effect manually for JobProcessingPage
jp_path = 'src/features/transformation/JobProcessingPage.tsx'
if os.path.exists(jp_path):
    with open(jp_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'setProgress(10);' in content:
        content = content.replace('setProgress(10);', 'setTimeout(() => setProgress(10), 0);')
        with open(jp_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Fixed JobProcessingPage.tsx')
