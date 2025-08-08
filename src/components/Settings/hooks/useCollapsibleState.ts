import {useState, useCallback} from 'react';

export interface CollapsibleState {
  [key: string]: boolean;
}

export interface UseCollapsibleStateReturn {
  isExpanded: (key: string) => boolean;
  toggle: (key: string) => void;
  expand: (key: string) => void;
  collapse: (key: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

/**
 * Hook for managing collapsible state for multiple sections
 * @param initialState - Object with keys as section identifiers and boolean values for initial state
 * @param defaultExpanded - Default state for new sections (default: false)
 */
export const useCollapsibleState = (
  initialState: CollapsibleState = {},
  defaultExpanded = false
): UseCollapsibleStateReturn => {
  const [expandedSections, setExpandedSections] = useState<CollapsibleState>(initialState);

  const isExpanded = useCallback(
    (key: string): boolean => {
      return expandedSections[key] ?? defaultExpanded;
    },
    [expandedSections, defaultExpanded]
  );

  const toggle = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const expand = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: true
    }));
  }, []);

  const collapse = useCallback((key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: false
    }));
  }, []);

  const expandAll = useCallback(() => {
    setExpandedSections(prev => {
      const newState: CollapsibleState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = true;
      });
      return newState;
    });
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedSections(prev => {
      const newState: CollapsibleState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      return newState;
    });
  }, []);

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll
  };
};
