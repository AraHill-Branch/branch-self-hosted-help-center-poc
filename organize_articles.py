#!/usr/bin/env python3

import csv
import os
import shutil
from pathlib import Path

def create_folder_structure(csv_file_path):
    """
    Read the CSV and create the complete folder structure for all workspaces
    """

    # Read the CSV file
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)

        # Track folders to create and file movements
        folders_to_create = set()
        file_movements = []

        for row in reader:
            workspace = row['Workspace'].lower().replace(' ', '-')
            category_path = row['Category']
            slug = row['Slug']

            if not workspace or not category_path or not slug:
                continue

            # Convert category path to folder structure
            # e.g., "Ads > SANs > SAN Integration Guides > Apple Ads" becomes "ads/sans/san-integration-guides/apple-ads"
            category_parts = [part.strip() for part in category_path.split('>')]
            folder_parts = []

            for part in category_parts:
                # Convert to folder-friendly format
                folder_name = part.lower()
                folder_name = folder_name.replace(' ', '-')
                folder_name = folder_name.replace('&', 'and')
                folder_name = folder_name.replace('(', '').replace(')', '')
                folder_name = folder_name.replace(',', '')
                folder_parts.append(folder_name)

            # Create the full path
            full_folder_path = os.path.join(workspace, *folder_parts)
            folders_to_create.add(full_folder_path)

            # Track where this file should go
            source_file = f"{workspace}/{slug}.md"
            target_file = f"{full_folder_path}/{slug}.md"

            file_movements.append((source_file, target_file, row['Title']))

    return folders_to_create, file_movements

def organize_articles(csv_file_path):
    """
    Main function to organize articles based on CSV mapping
    """
    print("Reading CSV and planning organization...")

    folders_to_create, file_movements = create_folder_structure(csv_file_path)

    # Create all necessary folders
    print(f"\nCreating {len(folders_to_create)} folder structures...")
    for folder in sorted(folders_to_create):
        os.makedirs(folder, exist_ok=True)
        print(f"  Created: {folder}")

    # Move files to their correct locations
    print(f"\nMoving {len(file_movements)} articles...")
    moved_count = 0
    missing_count = 0

    for source, target, title in file_movements:
        if os.path.exists(source):
            # Create target directory if it doesn't exist
            os.makedirs(os.path.dirname(target), exist_ok=True)

            # Move the file
            shutil.move(source, target)
            print(f"  ✓ Moved: {title}")
            moved_count += 1
        else:
            print(f"  ✗ Missing: {source} ({title})")
            missing_count += 1

    print(f"\nSummary:")
    print(f"  Successfully moved: {moved_count} articles")
    print(f"  Missing files: {missing_count} articles")
    print(f"  Created folders: {len(folders_to_create)} directories")

if __name__ == "__main__":
    # Run the organization
    csv_path = "articles-list.csv"

    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found in current directory")
        exit(1)

    organize_articles(csv_path)
    print("\nArticle organization complete!")